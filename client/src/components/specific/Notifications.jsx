/* eslint-disable no-unused-vars */
import { 
  Avatar, 
  Button, 
  Dialog, 
  DialogTitle, 
  ListItem, 
  Stack,
  Skeleton,  
  Typography,
 } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";


// const sampleNotifications = [
//   { _id: "1", sender: { name: "Alice", avatar: "" } },
//   { _id: "2", sender: { name: "Bob", avatar: "" } },
// ]; // Example notifications for testing

// const Notifications = () => {
//   const friendRequestHandler = (_id, accept) => {
//     // Handle friend request logic
//     console.log(`Friend request ${accept ? "accepted" : "rejected"} for ID: ${_id}`);
//   };
const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);


  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={"25rem"}
        // width="100%"
        // sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
      >
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? ( <Skeleton /> ) : ( 
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
        </Stack>
        </Dialog>
      );
    };

// eslint-disable-next-line react/display-name
const NotificationItem = memo(({ sender, _id, handler }) => {
      const { name, avatar } = sender;
      return (
        <ListItem>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
          >
            <Avatar />
    
            <Typography
              variant="body1"
              sx={{
                flexGlow: 1,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {`${name} sent you a friend request.`}
            </Typography>
    
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
            >
              <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
              <Button color="error" onClick={() => handler({ _id, accept: false })}>
                Reject
              </Button>
            </Stack>
          </Stack>
        </ListItem>
      );
    });
    
export default Notifications;
