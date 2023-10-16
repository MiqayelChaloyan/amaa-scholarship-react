// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import React, { useRef, useState } from "react";
import MDBox from "components/MDBox";

// @mui material components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// @mui material icons
import CloseIcon from "@mui/icons-material/Close";

// apis
import { getUploadUrl, addDocumentToApplication } from "hooks/allRequests/uploadFileApis";

// azure
import { BlockBlobClient } from "@azure/storage-blob";

// Images for file types
import ImageConfig from "./config/config";

import "./drop-file-input.css";

function Uploader({ fileType, appId, seeAllFiles, setError }) {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [changeInput, setChangeInput] = useState(false);

  const onDragEnter = () => {
    setChangeInput(true);
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = [];
    for (let i = 0; i < e.target.files.length; i += 1) {
      newFile.push(e.target.files[i]);
    }
    if (newFile) {
      setChangeInput(false);
      const updatedList = [...fileList, ...newFile];
      setFileList(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const filesRemoves = () => {
    const updatedList = [...fileList];
    updatedList.splice(fileList[0], fileList.length);
    setFileList(updatedList);
  };

  function rezisePicBeforUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      // eslint-disable-next-line func-names
      reader.onload = async function (readerEvent) {
        const image = new Image();
        // eslint-disable-next-line func-names, consistent-return
        image.onload = function () {
          const canvas = document.createElement("canvas");
          const maxSize = 1920;
          let { width, height } = image;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg");
          // make blob
          const BASE64_MARKER = ";base64,";
          if (dataUrl.indexOf(BASE64_MARKER) === -1) {
            const parts = dataUrl.split(",");
            const contentType = parts[0].split(":")[1];
            const raw = parts[1];
            return new Blob([raw], { type: contentType });
          }
          const parts = dataUrl.split(BASE64_MARKER);
          const contentType = parts[0].split(":")[1];
          const raw = window.atob(parts[1]);
          const rawLength = raw.length;
          const uInt8Array = new Uint8Array(rawLength);
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          const resizedImage = new Blob([uInt8Array], { type: contentType });
          resolve(resizedImage);
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  const uploadFiles = async () => {
    fileList.forEach(async (file) => {
      const requestToken = await getUploadUrl({
        fileName: file.name,
        containerNameEnd: `/scholarshipDocuments/${fileType}`,
      });
      if (requestToken) {
        const { uploadUrl } = requestToken;
        let blob = "";
        if (file.type !== "application/pdf") {
          blob = await rezisePicBeforUpload(file);
        } else {
          blob = file;
        }
        const blockBlobClient = new BlockBlobClient(uploadUrl);
        await blockBlobClient.uploadBrowserData(blob);
        await addDocumentToApplication({
          type: fileType,
          url: requestToken.blobName,
          application_id: appId,
        });
        await setFileList([]);
        seeAllFiles(appId);
        setError("");
      }
    });
  };
  return (
    <>
      <MDBox
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={{
          width: { md: "545px", sm: "320px", xs: "320px" },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "144px",
          border: "2px dashed #99AAB7",
          padding: "35% 0",
          borderRadius: "10px",
          marginBottom: "50px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(51, 201, 191, 0.2)",
          },
        }}
      >
        <IconButton
          aria-label="delete"
          onClick={filesRemoves}
          sx={{
            position: "absolute",
            zIndex: 20,
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <MDBox
          sx={{
            textAlign: "center",
            color: " var(--txt-second-color)",
            fontWeight: 600,
            padding: "10px",
          }}
        >
          <Typography
            variant="p"
            component="p"
            sx={{
              color: "#002B4D",
              marginBottom: "5px",
              fontSize: "15px",
            }}
          >
            Քաշել և թողնել նիշքերը այստեղ կամ
          </Typography>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Button
                onClick={() => uploadFiles()}
                disabled={!fileList.length}
                sx={
                  ({
                    width: "150px",
                    height: "40px",
                    border: "1px solid #002B4D !important",
                    borderRadius: "10px !important",
                    marginLeft: "20px",
                    textTransform: "none",
                  },
                  fileList.length
                    ? { color: "#33C9BF", backgroundColor: "#002B4D !important" }
                    : { color: "white", backgroundColor: "grey" })
                }
                variant="contained"
                component="label"
              >
                Վերբեռնել
              </Button>
            </Box>

            <Box>
              <Button
                sx={{
                  backgroundColor: "#002B4D !important",
                  color: "#33C9BF !important",
                  width: "100px",
                  height: "40px",
                  border: "1px solid #002B4D !important",
                  borderRadius: "10px !important",
                  marginLeft: "20px",
                  textTransform: "none",
                }}
                variant="contained"
                component="label"
              >
                Ընտրել
                <input hidden accept="image/*, .pdf" multiple type="file" onChange={onFileDrop} />
              </Button>
            </Box>
          </MDBox>
          {changeInput && (
            <input
              type="file"
              onChange={onFileDrop}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.6,
                },
              }}
            />
          )}
        </MDBox>
      </MDBox>
      {fileList.length > 0 ? (
        <MDBox sx={{ marginTop: "30px" }}>
          <Typography
            variant="p"
            component="p"
            sx={{
              width: { md: "320px", sm: "320px", xs: "320px" },
              fontSize: "15px",
              marginBottom: "20px",
            }}
          >
            Պատրաստ է վերբեռնելու համար
          </Typography>
          <MDBox
            sx={{
              width: { md: "300px", sm: "300px", xs: "300px" },
              display: "grid",
            }}
          >
            {fileList.map((item) => (
              <MDBox key={item.name} className="drop-file-preview__item">
                <img
                  src={ImageConfig[item.type.split("/")[1]] || ImageConfig.default}
                  alt=""
                  width="100%"
                />
                <MDBox className="drop-file-preview__item__info">
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "13px",
                    }}
                  >
                    {item.name}
                  </p>
                </MDBox>
                <Button
                  type="button"
                  className="drop-file-preview__item__del"
                  sx={{
                    position: "absolute",
                    zIndex: 20,
                    top: 0,
                    right: "-12px",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => fileRemove(item)}
                >
                  <CloseIcon color="black" fontSize="20px !important" />
                </Button>
              </MDBox>
            ))}
          </MDBox>
        </MDBox>
      ) : null}
    </>
  );
}

// Setting default props for the Uploader
Uploader.defaultProps = {
  fileType: "",
  appId: "",
  seeAllFiles: "",
  setError: "",
};

// Typechecking props for the Uploader
Uploader.propTypes = {
  fileType: PropTypes.string,
  appId: PropTypes.string,
  seeAllFiles: PropTypes.func,
  setError: PropTypes.func,
};

export default Uploader;
