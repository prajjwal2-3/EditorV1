"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import * as quillToWord from "quill-to-word";
import { FileText, DownloadCloud, Loader2, Save } from "lucide-react";
import { uploadDoc } from "@/actions/doc.action";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import { Button } from "./ui/button";
interface Payload {
  createdBy: string;
  title: string;
  htmlString: string;
}

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: Payload) => {
      if (!data || typeof data !== "object") {
        throw new Error("Invalid payload: Expected an object");
      }
      return await uploadDoc(data.createdBy, data.title, data.htmlString);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });
      setIsSaving(false);
    },
    onError: (error) => {
      console.error("Error saving document:", error);
      setIsSaving(false);
    },
  });

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

  const saveToDB = () => {
    setIsSaving(true);
    console.log(quillInstance.current?.getContents());
    const data: Payload = {
      createdBy: "prajjwalbh25@gmail.com",
      title: "newDoc",
      htmlString:
        quillInstance.current?.getSemanticHTML() ||
        '<div class="ql-editor ql-blank" contenteditable="true" data-placeholder="Write something amazing..."><p><br></p></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>',
    };
    console.log(data);
    mutation.mutate(data);
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
        <Button onClick={exportToPDF}>
          <DownloadCloud size={20} /> Export to PDF
        </Button>
        <Button onClick={exportToDocx}>
          <FileText size={20} /> Export to DOCX
        </Button>
        <Button onClick={saveToDB} disabled={isSaving}>
          {isSaving ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Editor;
