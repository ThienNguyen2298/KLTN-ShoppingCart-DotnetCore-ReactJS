import { createElement } from "react";


export default function downloadFile(data, type = "application/ms-excel", filename = "undefined.xlsx"){
    const blob = new Blob([data], {type: type});
    const fileName = filename;
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
}