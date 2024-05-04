import React, { FunctionComponent, useEffect, useState } from "react";
import PrimaherySearchAppBar from "./header";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import useAuthHeaders from "../../utils/sign";
import { alert } from "../../utils";
import { Badge, Grid, Modal, TextField } from "@mui/material";
import { useBookData } from "../../modules/home/context";

const modalStyle = {
  width: "430px",
  borderRadius: "12px",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { bookData, setBookData } = useBookData();

  const [isbn, setIsbn] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);
  const [editId, setEditId] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const {
    authHeadersFirst,
    authHeadersThird,
    authHeadersFifth,
    authHeadersSixth,
  } = useAuthHeaders({ isbn, deleteId, editId, status });

  useEffect(() => {
    axios
      .get("https://no23.lavina.tech/books", { headers: authHeadersFirst })
      .then((response) => {
        const { data } = response.data;
        if (Array.isArray(data)) {
          setBookData(data.map((item) => item.book));
        }
        setLoading(false);
      })
      .catch((error: any) => {
        alert.error(error.response.data.message);
        setLoading(false);
      });
  }, []);

  const handelCreateBook = () => {
    setLoading(true);
    const requestData = JSON.stringify({ isbn });
    const headers = authHeadersThird;
    axios
      .post("https://no23.lavina.tech/books", requestData, { headers })
      .then((response) => {
        setBookData(response.data.data.book);
        setLoading(false);
        alert.success("Successfully created");
        window.location.reload();
      })
      .catch((error) => {
        alert.error(error.response.data.message);
        setLoading(false);
      });
  };

  const handleDeleteBook = (id: number) => {
    setDeleteId(id);
    axios
      .delete(`https://no23.lavina.tech/books/${id}`, {
        headers: authHeadersFifth,
      })
      .then((response) => {
        alert.success("Successfully deleted!");
        window.location.reload();
      })
      .catch((error) => {
        alert.warning("Please click again");
      });
  };

  const handleEditBook = (id: number) => {
    setEditId(id);
    const requestData = JSON.stringify({ status });
    axios
      .patch(`https://no23.lavina.tech/books/${id}`, requestData, {
        headers: authHeadersSixth,
      })
      .then((response) => {
        alert.success("Successfully edited!");
        handleClose();
      })
      .catch((error) => {
        alert.warning("Please click again");
      });
  };

  return (
    <>
      <PrimaherySearchAppBar />
      <Box padding="0 100px" mt="36px">
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={6}>
            <Typography
              fontFamily="Mulish"
              fontWeight={700}
              fontSize="36px"
              color="white"
            >
              You`ve got{" "}
              <span style={{ color: "#6200EE" }}>
                {bookData?.length ? bookData.length : 0} book
              </span>{" "}
            </Typography>
          </Grid>

          <Grid item alignItems="center" justifyContent="center">
            <Box display="flex" gap={5}>
              <TextField
                variant="standard"
                placeholder="Enter book title ..."
                InputProps={{ disableUnderline: true }}
                style={{
                  background: "white",
                  width: "320px",
                  height: "47px",
                  padding: "10px 16px",
                  border: "1px solid #EBEBEB",
                  borderRadius: "6px",
                  borderColor: "none",
                }}
              />
              <Button
                onClick={handleOpen}
                sx={{
                  width: "240px",
                  bgcolor: "#6200EE",
                  fontSize: "16px",
                  fontFamily: "Mulish",
                  color: "#FEFEFE",
                  textTransform: "none",
                  "&:hover": { background: "#6200EE" },
                }}
              >
                + Create a book
              </Button>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Typography
              fontFamily="Mulish"
              fontSize={"20px"}
              fontWeight={400}
              color={"#FEFEFE"}
            >
              Your all Books
            </Typography>
          </Grid>
        </Grid>

        <Grid mt="30px" className="grid-scroll" container spacing={2}>
          {bookData?.map((book, index) => {
            return (
              <Grid item key={index} xs={4}>
                <Box
                  className="card"
                  width="500px"
                  display="flex"
                  alignItems="start"
                >
                  <Card
                    sx={{
                      marginTop: "20px",
                      transition: "all 0.2s",
                      width: "397px",
                      height: "220px",
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      borderRadius: "12px",
                    }}
                    variant="outlined"
                  >
                    <Typography
                      fontSize="16px"
                      fontWeight={600}
                      fontFamily={"Mulish"}
                      color={"#151515"}
                    >
                      Title: {book.isbn}
                    </Typography>
                    <Typography
                      fontFamily={"Mulish"}
                      fontWeight={400}
                      lineHeight="150%"
                      fontSize="14px"
                      color={"#333"}
                    >
                      Author: {book.author}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize="14px"
                        fontFamily="Mulish"
                        fontWeight={500}
                        color="black"
                      >
                        Published: {book.published}
                      </Typography>
                      <Badge
                        sx={{
                          width: "110px",
                          padding: "4px 10px",
                          height: "30px",
                          borderRadius: "8.5px",
                          bgcolor: "#EFE6FD",
                          color: "#9654F4",
                        }}
                      >
                        Pages : {book.pages}
                      </Badge>
                    </Box>
                  </Card>

                  {book.id ? (
                    <div
                      className="actions"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        marginTop: "40px",
                      }}
                    >
                      <div
                        key={book?.id}
                        onClick={() => {
                          handleDeleteBook(book?.id);
                        }}
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#FF4D4F",
                          borderRadius: "6px 6px 6px 0",
                          cursor: "pointer",
                          padding: "6px 5px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="19"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998"
                            stroke="#FEFEFE"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div
                        onClick={() => handleOpenEdit()}
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#6200EE",
                          borderRadius: "0px 6px 6px 6px",
                          cursor: "pointer",
                          padding: "6px 5px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="19"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
                            stroke="#FEFEFE"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </Box>

                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontFamily="Mulish"
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Edit Book
                      </Typography>
                      <svg
                        cursor="pointer"
                        onClick={handleCloseEdit}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M15 9.5L9 15.5M9 9.5L15 15.5M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z"
                          stroke="#151515"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Box>
                    <TextField
                      onChange={(e) => setStatus(e.target.value)}
                      variant="standard"
                      type="number"
                      placeholder="Enter status ..."
                      InputProps={{ disableUnderline: true }}
                      style={{
                        marginTop: "10px",
                        background: "white",
                        width: "100%",
                        height: "47px",
                        padding: "10px 16px",
                        border: "1px solid #EBEBEB",
                        borderRadius: "6px",
                        borderColor: "none",
                      }}
                    />
                    <Box display="flex" gap="20px" marginTop="20px">
                      <Button
                        onClick={() => handleCloseEdit()}
                        sx={{
                          width: "200px",
                          bgcolor: "none",
                          border: "solid 1px #6200EE",
                          fontSize: "16px",
                          fontFamily: "Mulish",
                          color: "#6200EE",
                          textTransform: "none",
                          "&:hover": { background: "none" },
                        }}
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          handleOpenEdit();
                          handleEditBook(book.id);
                        }}
                        disabled={loading}
                        sx={{
                          width: "200px",
                          bgcolor: "#6200EE",
                          fontSize: "16px",
                          fontFamily: "Mulish",
                          color: "#FEFEFE",
                          textTransform: "none",
                          "&:hover": { background: "#6200EE" },
                        }}
                      >
                        {loading ? "Loading..." : "Submit"}
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Grid>
            );
          })}
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily="Mulish"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Create a book
              </Typography>
              <svg
                cursor="pointer"
                onClick={handleClose}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M15 9.5L9 15.5M9 9.5L15 15.5M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z"
                  stroke="#151515"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>
            <TextField
              onChange={(e) => setIsbn(e.target.value)}
              variant="standard"
              type="isbn"
              placeholder="Enter isbn ..."
              InputProps={{ disableUnderline: true }}
              style={{
                marginTop: "10px",
                background: "white",
                width: "100%",
                height: "47px",
                padding: "10px 16px",
                border: "1px solid #EBEBEB",
                borderRadius: "6px",
                borderColor: "none",
              }}
            />
            <Box display="flex" gap="20px" marginTop="20px">
              <Button
                onClick={() => handleClose()}
                sx={{
                  width: "200px",
                  bgcolor: "none",
                  border: "solid 1px #6200EE",
                  fontSize: "16px",
                  fontFamily: "Mulish",
                  color: "#6200EE",
                  textTransform: "none",
                  "&:hover": { background: "none" },
                }}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleOpen();
                  handelCreateBook();
                }}
                disabled={loading}
                sx={{
                  width: "200px",
                  bgcolor: "#6200EE",
                  fontSize: "16px",
                  fontFamily: "Mulish",
                  color: "#FEFEFE",
                  textTransform: "none",
                  "&:hover": { background: "#6200EE" },
                }}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Home;
