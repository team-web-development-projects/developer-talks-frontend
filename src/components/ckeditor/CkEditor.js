import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./ckeditor.css";
const CkEditor = ({ form, setForm }) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: "내용을 작성해주세요.",
        }}
        name="content"
        value={form.content}
        onChange={(e, editor) => {
          const data = editor.getData();
          setForm({ ...form, content: data });
        }}
      />
    </>
  );
};

export default CkEditor;
