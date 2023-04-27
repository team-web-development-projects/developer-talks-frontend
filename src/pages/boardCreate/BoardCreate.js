import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './boardCreate.module.scss';

export default function BoardCreate() {
    const [form,setForm]=useState({
        title: '',
        content: '',

    });
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(`
            제목: ${form.title}
            내용: ${form.content}
        `);
        // const data = new FormData();
        // data.append("", form.title);
        // data.append("", form.content);
        // const value = Object.fromEntries(data.entries());
        // let model = {
        //   method: "PUT",
        //   body: JSON.stringify(value),
        //   headers: {
        //     Authorization: ,
        //     "Content-Type": "application/json",
        //   },
        // };
        // fetch(``, model)
        //     .then((res) => res.json())
        //     .then((res) => {
        //       window.alert("게시글이 등록되었습니다.");
        //       window.location.replace("");
        //     });
    };
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setForm({...form, [name]:value})
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <input 
                        className={styles.title} 
                        type='text'
                        name='title'
                        value={form.title}
                        placeholder='제목을 작성해주세요.'
                        onChange={handleChange}/>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            placeholder: "내용을 작성해주세요.",
                        }}
                        name='content'
                        value={form.content}
                        onChange={(e,editor)=>{
                            const data=editor.getData();
                            setForm({...form, ['content']:data})
                        }}
                    />
                    <div className={styles.btnRgn}>
                        <div className={styles.cancel}>취소</div>
                        <button className={styles.submit}>저장</button>
                    </div>
                </div>
            </form>
        </>
    );
}

