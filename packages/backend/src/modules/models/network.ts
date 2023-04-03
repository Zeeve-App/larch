import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';

export class Network {
  public id: string;

  private primaryTable = 'networks';

  private db = () => knexInstance(this.primaryTable);

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }
  // removing state

  async addAllNetworkInfo(
    id:string,
    name: string,
    config_filename: string,
    config_content: string,
    network_directory: string,
    network_provider: string,
    test_filename: string,
    test_content: string,
  ): Promise<void> {
    await this.db()
      .insert({
        id,
        name,
        config_filename,
        config_content,
        network_directory,
        network_provider,
        test_filename,
        test_content,
      });
  }

  // async addNetworkInfoWithoutTestFiles(
  //   name: string,
  //   config_filename: string,
  //   config_content: string,
  //   network_directory: string,
  //   network_provider: string,
  //   network_state: string,
  // ): Promise<void> {
  //   await this.db()
  //     .insert({
  //       id: this.id,
  //       name,
  //       config_filename,
  //       config_content,
  //       network_directory,
  //       network_provider,
  //       network_state,
  //     });
  // }

  async displayNetworkByNetworkName(network_name: string): Promise<any> {
    const [result] = await this.db()
      .select('*')
      .where('name', network_name);
    return result;
  }

  async testNetwork(network_name: string): Promise<any> {
    // console.log(this.id);
    const result = await this.db()
      .select('test_filename', 'test_content')
      .where('name', network_name);
    if (result[0].test_filename != null && result[0].test_content != null) {
      return result;
    }
    return null;
  }

  async updateNetworkInfoWithConfigFile(
    network_name: string,
    config_filename: string,
    config_content: string,
    test_filename: string,
    test_content: string,
  ): Promise<void> {
    await this.db()
      .where('name', network_name)
      .update({
        config_filename,
        config_content,
        test_filename,
        test_content,
      });
  }

  async updateNetworkInfoWithoutConfigFile(
    network_name: string,
    config_filename: string,
    test_filename: string,
    test_content: string,
  ): Promise<void> {
    await this.db()
      .where('name', network_name)
      .update({
        config_filename,
        test_filename,
        test_content,
      });
  }

  async findNetworkProgress(network_name: string): Promise<any> {
    // console.log(this.id);
    const [result] = await this.db()
      .select('network_state')
      .where('network_name', network_name);
    return result;
  }

  async deleteNetwork(
    network_name: string,
  ): Promise<void> {
    await this.db()
      .where('network_name', network_name)
      .del();
  }

  async updateStatus(
    runId: string,
    state: string,
  ): Promise<void> {
    await this.db()
      .where('id', runId)
      .update({
        network_state: state,
      });
  }
}

export const getNetworkList = async () => {

};
