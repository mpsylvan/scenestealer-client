// import { useSelector } from "react-redux";

// export const loadState = () => {
//   try {
//     const serializedUser = localStorage.getItem("user");
//     const serializedToken = localStorage.getItem("token");
//     if (serializedUser === null || serializedToken === null) {
//       return undefined;
//     }
//     return {
//       serializedToken,
//       serializedUser,
//     };
//   } catch (err) {
//     return undefined;
//   }
// };

// export const saveState = () => {
//   try {
//     const serializedUser = useSelector((state) => state.user.user);
//     const serializedToken = useSelector((state) => state.user.token);
//     localStorage.setItem("user", serializedUser);
//     localStorage.setItem("token", serializedToken);
//   } catch (err) {
//     return undefined;
//   }
// };
