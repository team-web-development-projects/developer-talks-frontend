import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./ckeditor.css";

const CkEditor = ({ form, setForm, placeholder }) => {
  let prevData = form.content;
  const filesOrder = [];
  const customUploadAdapter = (loader, editor) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            console.log("파일정보: ", file);
            setForm((prevForm) => ({
              ...prevForm,
              files: [...prevForm.files, file],
            }));
            let cmp_data = "";
            let cnt = 0;
            console.log("이전 데이터: ", prevData);
            console.log("현재 데이터: ", editor.getData()); // editor.getData()를 사용하여 현재 데이터를 가져옵니다.
            for (let i = 0; i < editor.getData().length; i++) {
              if (editor.getData()[i] !== prevData[i]) {
                cnt = cmp_data.match(/<img/g).filter((item) => item !== "").length;
                console.log("이전 이미지 개수: ", cnt);
                console.log("이미지 순서: ", form.filesOrder);
                filesOrder.forEach((order, idx) => {
                  if (order >= cnt) {
                    setForm((prevForm) => {
                      const updatedFilesOrder = [...prevForm.filesOrder];
                      updatedFilesOrder[idx] = order + 1;
                      return {
                        ...prevForm,
                        filesOrder: updatedFilesOrder,
                      };
                    });
                    filesOrder[idx] = order + 1;
                  }
                });

                break;
              }
              cmp_data += editor.getData()[i];
            }
            setForm((prevForm) => ({
              ...prevForm,
              filesOrder: [...prevForm.filesOrder, cnt],
            }));
            filesOrder.push(cnt);
            prevData = editor.getData(); // prevData를 현재 데이터로 갱신합니다.
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader, editor);
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
          // 이미지 업로드 및 비교 로직 등을 진행하고 난 후에 prevData를 갱신합니다.
          prevData = editor.getData();
          const data = prevData;
          setForm({ ...form, ["content"]: data });
        }}
      />
    </>
  );
};

export default CkEditor;
