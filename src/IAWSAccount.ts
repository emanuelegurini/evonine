/**
 * Represents the interface for AWS account operations.
 */
export interface IAWSAccount {
  /**
   * Get the current AWS region.
   *
   * @returns The AWS region.
   */
  getRegion(): string;

  /**
   * Set the AWS region.
   *
   * @param region - The AWS region to set.
   */
  setRegion(region: string): void;

  /**
   * Checks if all the stacks have been verified.
   *
   * @returns `true` if stacks are verified, otherwise `false`.
   */
  stackVerified(): boolean;

  /**
   * Verifies all the CloudFormation stacks.
   */
  verifyAllStacks(): void;

  /**
   * Fetches the list of all drifted CloudFormation stacks.
   *
   * @returns List of drifted stacks as a string.
   */
  getDriftedStacks(): string;

  /**
   * Load and update the drifted CloudFormation stacks.
   */
  loadDriftedStack(): void;

  /**
   * Fetches the status of all CloudFormation stacks.
   *
   * @returns Status of all stacks as a string.
   */
  getAllStackStatus(): string;

  /**
   * Load and update the status of all CloudFormation stacks.
   */
  loadAllStackWithStatus(): void;

  /**
   * Load all the CloudFormation stack names.
   */
  loadStackNames(): void;

  /**
   * Get all the CloudFormation stack names.
   *
   * @returns An array of CloudFormation stack names.
   */
  getStackNames(): Array<string>;
}
