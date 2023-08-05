export interface IAWSAccount {
  /**
   * Gets the currently set AWS region for the AWSAccount instance.
   * @returns {string} The currently set AWS region.
   */
  getRegion: () => string;

  /**
   * Sets the AWS region for the AWSAccount instance.
   * @param {string} region - The AWS region to set.
   * @returns {void}
   * @throws {Error} Throws an error if the provided region is null.
   */
  setRegion: (region: string) => void;

  /**
   * Checks all AWS stacks for drift.
   * This method iterates through all the stack names, detects drift for each stack,
   * and sets the '_isStacksChecked' flag to true once all stacks are checked.
   * @returns {boolean} Returns true if all stacks are checked for drift successfully, otherwise false.
   */
  checkAllStacks: () => boolean;

  /**
   * Gets all AWS stacks with drift status as "DRIFTED".
   * This method calls the 'checkAllStacks' method if the stacks are not already checked,
   * then returns the drifted stacks by calling the 'getAllDriftedStacks' method of the 'AWSNetworkOperator'.
   * @returns {string} The names of AWS stacks with drift status as "DRIFTED", or "All stacks are in sync" if there are no drifted stacks.
   */
  getAllDriftedStack: () => string;

  /**
   * Gets the status of all AWS stacks.
   * This method calls the 'checkAllStacks' method if the stacks are not already checked,
   * then returns the status of all stacks by calling the 'getAllStackWithStatus' method of the 'AWSNetworkOperator'.
   * @returns {string} The status of all AWS stacks.
   */
  getAllStackWithStatus: () => string;

  /**
   * Retrieves AWS stack names from the stack list and stores them in the '_stackNamesList' property.
   * This method calls the 'fetchStackList' method of the 'AWSNetworkOperator' to get the stack names.
   * @returns {boolean} Returns true if stack names are retrieved successfully, otherwise false.
   */
  getStackNamesFromStackList: () => boolean;

  /**
   * Gets the list of AWS stack names.
   * If the '_stackNamesList' property is empty, it calls the 'getStackNamesFromStackList' method to fetch the stack names first.
   * @returns {Array<string>} An array of AWS stack names.
   */
  getStackNameList: () => Array<string>;
}
