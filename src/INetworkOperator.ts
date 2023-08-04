export interface IAWSNetworkOperator {
  fetchStackList(region: string): string;
  detectStackDrift(stackName: string, region: string): string;
  getAllStackWithStatus(region: string): string;
  getAllDriftedStacks(region: string): string;
}
