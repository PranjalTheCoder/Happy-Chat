
// export const usernameValidator = (username) => {
//     if (!username) {
//         return { isValid: false, errorMessage: "Username cannot be empty" };
//     }

//     // Ensure username is at least 3 characters long
//     if (username.length < 3) {
//         return { isValid: false, errorMessage: "Username must be at least 3 characters long" };
//     }

//     // Ensure username only contains alphanumeric characters
//     const usernameRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric and underscores allowed
//     if (!usernameRegex.test(username)) {
//         return { isValid: false, errorMessage: "Username can only contain letters, numbers, and underscores" };
//     }

//     // If all checks pass
//     return { isValid: true, errorMessage: "" };
// };
import { isValidUsername } from "6pp";

export const usernameValidator = (username) => {
  if (!isValidUsername(username))
    return { isValid: false, errorMessage: "Username is Invalid" };
};