import { knexInstance } from '../db/sqlite.js';

export class ExecRun {
  public id: string;

  private primaryTable = 'exec_run';

  // Both latest std variables are used to improve
  // Race conditions, since nodejs runtime is single threaded
  // the locks are not needed and we only want to update latest value
  // or old value , even though query might run multiple times maybe for same value
  private latestStdError = '';

  private latestStdOutput = '';

  private db = () => knexInstance(this.primaryTable);

  constructor(id: string) {
    this.id = id;
  }

  async addMinimalInfo(command: string): Promise<void> {
    await this.db()
      .insert({
        id: this.id,
        command,
      });
  }

  async updateStdError(stdError: string): Promise<void> {
    this.latestStdError = stdError;
    await this.db()
      .where('id', this.id)
      .update({ std_error: this.latestStdError });
  }

  async updateStdOutput(stdOutput: string): Promise<void> {
    this.latestStdOutput = stdOutput;
    await this.db()
      .where('id', this.id)
      .update({ std_output: this.latestStdOutput });
  }

  async updateStateCode(statusCode: number): Promise<void> {
    await this.db()
      .where('id', this.id)
      .update({ status_code: statusCode });
  }

  async getRunInfo(): Promise<any> {
    console.log(this.id);
    // const ID = this.id;
    const [result] = await this.db()
      .select('*')
      .where('id', this.id);
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  async getRunInfoById(networkId: string): Promise<any> {
    const [result] = await this.db()
      .select('*')
      .where('id', networkId);
    return result;
  }

  async showNetworkState(networkId: string): Promise<any> {
    const result = await this.db()
      .select('status_code')
      .where('id', networkId);
    return result;
  }
}

export const getExecRunList = async () => {

};
