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
  <marquee><h1 className='h1'>Download Bash file from here and add in the folder</h1></marquee>
    <div className='form'>
    <form onSubmit={submit} className='data'>
        <input type='text' className='input' placeholder='Please Enter Github Repository Link'  name='giturl' value={url} onChange={urlUpdate} required={true}></input><br/>
        {/* <input type="text" name='localPath' value={Localpath} onChange={LocalPathUpdate} required={true}></input> */}
        <button className='btn' type='submit' name='Download' value='Download' onClick={downloadFile}>Download File</button>
    </form>
    </div>
  </>  
  );
}

export default App;
