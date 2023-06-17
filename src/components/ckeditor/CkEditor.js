import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./ckeditor.css";
import axios from "axios";

const CkEditor = ({ form, setForm, placeholder }) => {

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);
            console.log("dd", file.name, formData);
            setForm((prevForm) => ({
              ...prevForm,
              files: [...prevForm.files, file.name]
            }));
            // setForm({
            //   ...form, ['files']: formData.name
            // })
            // axios
            //   .post("http://localhost:8080/api/v0/file/upload", formData)
            //   .then((res) => {
            //     resolve({
            //       default: res.data.data.uri,
            //     });
            //   })
            //   .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: placeholder,
          extraPlugins: [uploadPlugin],
        }}
        name="content"
        value={form.content}
        data={form.content}
        onChange={(e, editor) => {
          const data = editor.getData();
          setForm({ ...form, ["content"]: data });
        }}
      />
    </>
  );
};

export default CkEditor;
