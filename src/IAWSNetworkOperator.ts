export interface IAWSNetworkOperator {
  /**
   *
   * @param region
   */
  fetchStackList(region: string): string;

  /**
   *
   * @param stackName
   * @param region
   */
  detectStackDrift(stackName: string, region: string): string;

  /**
   *
   * @param region
   */
  getAllStackWithStatus(region: string): string;

  /**
   *
   * @param region
   */
  getAllDriftedStacks(region: string): string;
}
