export interface IMenu {
  /**
   * Get the menu options for the AWS Account class.
   * @returns {Object.<string, Function>} An object containing menu options as keys and corresponding functions as values.
   */
  getMenuOptions: () => void;

  /**
   * Print a menu with header and options to the console.
   * @param {string} header - The header text to display at the top of the menu.
   * @param {Object.<number, string>} options - An object containing menu options as keys and their descriptions as values.
   * @returns {void}
   */
  print: (header: string, options: { [key: number]: string }) => void;

  /**
   * Start the AWS Account drift detector.
   * This method displays the header, allows the user to select a region,
   * and presents a menu of options to perform various actions related to stack drift detection.
   * The user can choose menu options until they choose to exit ('x').
   * @returns {Promise<void>} A Promise that resolves when the drift detector is started and the user exits.
   */
  start: () => Promise<void>;

  /**
   * Get user input from the console.
   * @returns {Promise<string>} A Promise that resolves with the user's input as a string (trimmed and converted to lowercase).
   */
  getInput: () => Promise<string>;

  /**
   * Print all AWS Stack names on a .txt file.
   * This method fetches the AWS Stack names, creates a Printer instance to print the data,
   * and saves the Stack names to a .txt file in the current directory.
   * @returns {void}
   */
  printAllStackNamesOnTXTFile: () => void;

  /**
   * Log all AWS Stack names to the console.
   * This method fetches the AWS Stack names and logs them to the console.
   * @returns {void}
   */
  logAllStackNames: () => void;

  /**
   * Check if all AWS stacks are in sync.
   * This method checks if all AWS stacks are in sync by calling the `checkAllStacks()` method of the AWSAccount class.
   * If the stacks are checked successfully, it logs a message indicating that the stacks are checked.
   * @returns {void}
   */
  checkAllStacks: () => void;

  /**
   * Log all AWS stacks with drift status as "DRIFTED" to the console.
   * This method checks for all AWS stacks with drift status as "DRIFTED" by calling the `getAllDriftedStack()` method of the AWSAccount class.
   * The names of the drifted stacks are logged to the console.
   * @returns {void}
   */
  logAllDriftedStack: () => void;

  /**
   * Print names of all AWS stacks with drift status as "DRIFTED" on a .txt file.
   * This method fetches the AWS stack names and filters those with drift status as "DRIFTED" by calling the `getAllDriftedStack()` method of the AWSAccount class.
   * The names of the drifted stacks are then printed to a .txt file in the current directory using the Printer class.
   * @returns {void}
   */
  printAllDriftedStackOnTXTFile: () => void;

  /**
   * Get the status of all AWS stacks.
   * This method fetches the status of all AWS stacks by calling the `getAllStackWithStatus()` method of the AWSAccount class.
   * The stack information, including status, is logged to the console.
   * @returns {void}
   */
  getAllStatusStack: () => void;

  /**
   *
   */
  printAllStackWithStatusOnTXTFile: () => void;
}
