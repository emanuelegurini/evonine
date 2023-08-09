/**
 * Represents a utility interface for operating on AWS network resources.
 */
export interface IAWSNetworkOperator {
  /**
   * Fetches a list of CloudFormation stacks filtered by their status for the specified region.
   *
   * @param region - The AWS region to retrieve the stack list for.
   * @returns The result of the `list-stacks` command.
   * @throws {Error} If there's a problem executing the command.
   */
  fetchStackList(region: string): string;

  /**
   * Detects drift on a specific CloudFormation stack in the specified region.
   *
   * @param stackName - The name of the CloudFormation stack to check for drift.
   * @param region - The AWS region where the stack is located.
   * @returns The result of the `detect-stack-drift` command.
   * @throws {Error} If there's a problem executing the command.
   */
  detectStackDrift(stackName: string, region: string): string;

  /**
   * Fetches the status of all CloudFormation stacks in the specified region.
   *
   * @param region - The AWS region to retrieve the stack statuses for.
   * @returns The result of the `list-stacks` command.
   * @throws {Error} If there's a problem executing the command.
   */
  fetchAllStackStatus(region: string): string;

  /**
   * Fetches all CloudFormation stacks that have drifted in the specified region.
   *
   * @param region - The AWS region to retrieve the drifted stack list for.
   * @returns The result of the `list-stacks` command with a filter for `DRIFTED` stacks.
   * @throws {Error} If there's a problem executing the command.
   */
  fetchAllDriftedStacks(region: string): string;
}
