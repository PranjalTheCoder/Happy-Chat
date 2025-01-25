import React, { lazy, Suspense,memo, useEffect, useState } from "react";
import { 
  Backdrop, 
  Box, 
  Button, 
  Grid,
  CircularProgress, 
  Drawer, 
  IconButton, 
  Stack, 
  TextField, 
  Tooltip, 
  Typography 
} from "@mui/material";
import { 
  KeyboardBackspace as KeyboardBackspaceIcon, 
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon, 
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { bgGradient, matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import  AvatarCard  from "../components/shared/AvatarCard";
// import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
import { LayoutLoader } from "../components/layout/Loaders";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

// const isAddMember = false;


const Groups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const { isAddMember } = useSelector((state) => state.misc);
  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [ updateGroup, isLoadingGroupName ] = useAsyncMutation(useRenameGroupMutation);
  const [ removeMember, isLoadingRemoveMember ] = useAsyncMutation(useRemoveGroupMemberMutation);
  // eslint-disable-next-line no-unused-vars
  const [ deleteGroup, isLoadingDeleteGroup ] = useAsyncMutation(useDeleteChatMutation);

  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
  const [ groupName, setGroupName ] = useState(""); 
  const [ groupNameUpdatedValue, setGroupNameUpdatedValue ] = useState("");
  const [ isEdit, setIsEdit ] = useState(false);
  const [ confirmDeleteDialog, setConfirmDeleteDialog ] = useState(false);
  const [ members, setMembers] = useState([]);  

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => { setConfirmDeleteDialog(true) };
  const closeConfirmDeleteHandler = () => { setConfirmDeleteDialog(true) };
  const openAddMemberHandler = () => { dispatch(setIsAddMember(true)) };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    // console.log(" Delete Handler ");
    closeConfirmDeleteHandler();
    navigate("/groups");
  };
  const removeMemberHandler = (userId) => {
      removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if(chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);


  const IconBtns =
     <>
      <Box
        sx={{
          display: { 
            xs: "block", 
            sm: "none",
            position: "fixed", 
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <Tooltip title="Menu">
      <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      </Box>
      <Tooltip title = "back">
        <IconButton 
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color : "white",
            ":hover": {
              bgcolor: "rgba(0, 0, 0, 0.7)",
            },
          }}
          onClick={navigateBack}
          >
        <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>;

    const GroupName = (
      <Stack 
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={"1rem"}
          padding={"3rem"}
      >
        {
          isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton 
            onClick={updateGroupName}
            disabled={isLoadingGroupName}>
              <DoneIcon />
            </IconButton>
          </> 
        ) : (
          <>
            <Typography variant="h4">{ groupName }</Typography>
            <IconButton 
            disabled={isLoadingGroupName}
            onClick={()=> setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    );

      const ButtonGroup = (
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
          
        }}
        spacing={"1rem"}
        p={{
          xs: "0",
          sm:"1rem",
          md:"1rem 4rem",
        }}
        >
          <Button 
            size="large" 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddMemberHandler}>
          Add Members
          </Button>
          <Button 
            size="large" 
            variant="outlined" 
            color="error"
            startIcon={<DeleteIcon />}
            onClick={openConfirmDeleteHandler}>
          Delete Group
          </Button>
      </Stack>
    );
    return myGroups.isLoading ? (
      <LayoutLoader />
    ) : (
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          sm={4}
        >
          <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
        </Grid>
  
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
          }}
        >
          {IconBtns}
  
          {groupName && (
            <>
              {GroupName}
  
              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>
  
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
              >
                {/* Members */}
  
                {isLoadingRemoveMember ? (
                  <CircularProgress />
                ) : (
                  members.map((i) => (
                    <UserItem
                      user={i}
                      key={i._id}
                      isAdded
                      styling={{
                        boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                        padding: "1rem 2rem",
                        borderRadius: "1rem",
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
                )}
              </Stack>
  
              {ButtonGroup}
            </>
          )}
        </Grid>
  
        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )}
  
        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )}
  
        <Drawer
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
        >
          <GroupsList
            w={"50vw"}
            myGroups={myGroups?.data?.groups}
            chatId={chatId}
          />
        </Drawer>
      </Grid>
    );
  };
  
  // eslint-disable-next-line react/prop-types
  const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
    <Stack
      width={w}
      sx={{
        backgroundImage: bgGradient,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={"center"} padding="1rem">
          No groups
        </Typography>
      )}
    </Stack>
  );
  
  // eslint-disable-next-line react/display-name, react/prop-types
  const GroupListItem = memo(({ group, chatId }) => {
    // eslint-disable-next-line react/prop-types
    const { name, avatar, _id } = group;
  
    return (
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId === _id) e.preventDefault();
        }}
      >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <AvatarCard avatar={avatar} />
          <Typography>{name}</Typography>
        </Stack>
      </Link>
    );
  });
  
  export default Groups;