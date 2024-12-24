"use client";

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import * as quillToWord from "quill-to-word";
import { FileText, DownloadCloud } from "lucide-react"; 

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something amazing...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  const exportToPDF = async () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;

      const options = {
        margin: 1,
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(options).from(content).save();
    }
  };

  const exportToDocx = async () => {
    if (quillInstance.current) {
      const delta = quillInstance.current.getContents();
      const config: quillToWord.Config = {
        exportAs: "blob",
      };

      const blob = await quillToWord.generateWord(delta, config);
      //@ts-expect-error
      saveAs(blob, "document.docx");
    }
  };

  return (
    <div>
      <div
        ref={editorRef}
        style={{
          minHeight: "400px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={exportToPDF}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            gap: "10px",
          }}
        >
          <DownloadCloud size={20} /> Export to PDF
        </button>
        <button
          onClick={exportToDocx}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            gap: "10px",
          }}
        >
          <FileText size={20} /> Export to DOCX
        </button>
      </div>
    </div>
  );
};

export default Editor;
