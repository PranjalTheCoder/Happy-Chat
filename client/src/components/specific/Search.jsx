import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
// import { sampleUsers } from "../../constants/sampleData"; // Assuming sampleUsers is the correct name

const Search = () => {
  


  const { isSearch } = useSelector((state) => state.misc);
  const [ searchUser ] = useLazySearchUserQuery();
  const [ sendFriendRequest, isLoadingSendFriendRequest ] = useAsyncMutation(useSendFriendRequestMutation);
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [ users, setUsers ] = useState([]);
  
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(()=>{
    const timeOutId = setTimeout(()=>{
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [ search.value ]);
  
  // State to manage loading state for sending friend request
  // const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] = useState(false);

  // Users state
  // eslint-disable-next-line no-unused-vars
  // const [users, setUsers] = useState(sampleUsers); // Assuming sampleUsers is correct

  // Add friend handler function
  // const addFriendHandler = (id) => {
  //   console.log(id);
  //   // Simulate an async action (e.g., API call)
  //   setIsLoadingSendFriendRequest(true);
  //   setTimeout(() => {
  //     setIsLoadingSendFriendRequest(false);
  //     console.log(`Friend request sent to user with id: ${id}`);
  //   }, 2000); // Simulate a delay
  // };

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;