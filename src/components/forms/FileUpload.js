import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Image, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //console.log(e.target.files);
    //resize
    let files = e.target.files;
    let allUploadeFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //console.log(uri)
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image:uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                //console.log("IIMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadeFiles.push(res.data);
                setValues({ ...values, images: allUploadeFiles });
              })
              .catch((err) => {
                //console.log("Image upload err", err);
              });
          },
          "base64"
        );
      }
    }
    //
  };
  const handleImageRemove = (public_id) => {
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose Product Images
          <input
            type="file"
            hidden
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
      <div className="row mt-4 mb-4">
      {values.images &&
        values.images.map((i) => <Badge
            count="X"
            key={i.public_id}
            onClick={() => handleImageRemove(i.public_id)}
            style={{ marginRight:'30px', cursor:"pointer" }}
          >
            <Avatar src={i.url} shape="square" style={{ width: 80,height: 80, marginRight:'30px' }}/>
          </Badge>) }
      </div>
     
    </>
  );
};

export default FileUpload;
