import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./ckeditor.css";

const CkEditor = ({ form, setForm, placeholder }) => {
  // let fileNum = 0;
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            console.log("파일정보: ", file);
            setForm((prevForm) => ({
              ...prevForm,
              files: [...prevForm.files, file],
            }));
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
          // console.log("data: ",data);
        }}
      />
    </>
  );
};

export default CkEditor;
