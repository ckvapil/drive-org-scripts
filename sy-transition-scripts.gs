function runCondenseFolders(){
  condenseFolders("path here");
}

function condenseFolders(path){
  var newFolderName = "2017-2018";
  var cmfolders = DriveApp.getFolderById(path).getFolders();
  
  while (cmfolders.hasNext()) {
    
    // get 1 CM's folder
    var cmfolder = cmfolders.next();
    var cmfolderFiles = cmfolder.getFiles(); // gets all the files in cmfolder
    var cmfolderFolders = cmfolder.getFolders(); // gets all the folders in cmfolder
    var duplicateFolders = cmfolder.getFoldersByName(newFolderName); // gets a folder that already has newFolderName as the name
    
    // create a newFolder to store all current contents into if newFolder doesn't alread exist
    if(duplicateFolders.hasNext()){
        var newFolder = duplicateFolders.next();
    }
    else{
      var newFolder = cmfolder.createFolder(newFolderName);
    }
    
    // move all FILES into newFolderName
    while (cmfolderFiles.hasNext()){
      var cmfolderFile = cmfolderFiles.next();
      // add the file to the newFolder & remove the file from the current cmfolder (old folder)
      newFolder.addFile(cmfolderFile);
      cmfolder.removeFile(cmfolderFile);
    }
    
    // move all FOLDERS that != newFolderName name into newFolderName
    while (cmfolderFolders.hasNext()){
      var cmfolderFolder = cmfolderFolders.next();
      // add the folder to the newFolder & remove the folder from current cmfolder (old folder)
      var cmfolderFolderName = cmfolderFolder.getName();
      if(cmfolderFolderName == newFolderName || cmfolderFolderName == "2018 Institute" || cmfolderFolderName == "2017 Institute"){
        // do nothing
      }
      else {
      newFolder.addFolder(cmfolderFolder);
      cmfolder.removeFolder(cmfolderFolder);
      }
    }
    Logger.log(cmfolder.getName()+" condensed.");
  }
}
