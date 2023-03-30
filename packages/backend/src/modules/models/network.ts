import { knexInstance } from '../db/sqlite.js';

export class Network {
  public id: string;

  private primaryTable = 'networks';

  private db = () => knexInstance(this.primaryTable);

  constructor(id: string) {
    this.id = id;
  }

  async addAllNetworkInfo(
    network_name: string,
    config_filename: string,
    config_content: string,
    network_directory: string,
    network_provider: string,
    network_state: string,
    test_filename: string,
    test_content: string,
  ): Promise<void> {
    await this.db()
      .insert({
        id: this.id,
        network_name,
        config_filename,
        config_content,
        network_directory,
        network_provider,
        network_state,
        test_filename,
        test_content,
      });
  }

  async addNetworkInfoWithoutTestFiles(
    network_name: string,
    config_filename: string,
    config_content: string,
    network_directory: string,
    network_provider: string,
    network_state: string,
  ): Promise<void> {
    await this.db()
      .insert({
        id: this.id,
        network_name,
        config_filename,
        config_content,
        network_directory,
        network_provider,
        network_state,
      });
  }

  async displayNetworkByNetworkName(network_name: string): Promise<any> {
    console.log(this.id);
    const [result] = await this.db()
      .select('*')
      .where('network_name', network_name);
    return result;
  }

  async testNetwork(network_name: string): Promise<any> {
    // console.log(this.id);
    const [result] = await this.db()
      .select('test_filename', 'test_content')
      .where('network_name', network_name);
    return result;
  }

  async updateNetworkInfoWithConfigFile(
    network_name: string,
    config_filename:string,
    config_content:string,
    test_filename:string,
    test_content:string,
  ): Promise<void> {
    await this.db()
      .where('network_name', network_name)
      .update({
        config_filename,
        config_content,
        test_filename,
        test_content,
      });
  }

  async updateNetworkInfoWithoutConfigFile(
    network_name: string,
    config_filename:string,
    test_filename:string,
    test_content:string,
  ): Promise<void> {
    await this.db()
      .where('network_name', network_name)
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
      .delete('*');
  }
}

export const getNetworkList = async () => {

};