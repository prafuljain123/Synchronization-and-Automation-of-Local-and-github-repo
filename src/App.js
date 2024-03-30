import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import FileSaver from 'file-saver';
function App() {
  const[url,setUrl] = useState("");
  const[Localpath,setLocalPath] = useState("");
  const fileData = `
#!/bin/bash

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin ${url}
git push -u origin main

while sleep 5
do
git diff --quiet; nochanges=$?
if [ $nochanges -eq 0 ]; then
    continue
else
  git add .
	git commit -m "commit"
	git push
	echo "saving"
fi
done
  `;
  const urlUpdate = (e) =>{
    setUrl(e.target.value);
  }
  const LocalPathUpdate = (e) =>{
    setLocalPath(e.target.value);
  }
  const downloadFile = () =>{
      if(url === ""){
        alert("Please Enter Repository Link");
        return;
      }
      var blob = new Blob([fileData], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, "bash.sh");
  }
  const submit = () =>{
    setUrl("");
    setLocalPath("");
  }
  return (
  <>
  <div className="box">
        <form onSubmit={submit}>
            <div className="inputBx">
                <span></span>
                <input type="Link" placeholder="Upload Link Here" name='giturl' value={url} onChange={urlUpdate} required={true}></input>
            </div>
            <div className="inputBx">
                <span></span>
                <input type="submit" placeholder="Username" name='Download' value='Download' onClick={downloadFile}></input>
            </div>
        </form>
    </div>
  </>  
  );
}

export default App;
