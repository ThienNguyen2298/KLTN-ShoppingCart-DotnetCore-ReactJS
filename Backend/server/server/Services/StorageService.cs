using Microsoft.AspNetCore.Hosting;
using server.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class StorageService : IStorageService
    {
        private readonly string _userContentFolder;
        private const string USER_CONTENT_FOLDER_NAME = "images";
        public StorageService(IWebHostEnvironment webHostEnvironment)
        {
            _userContentFolder = Path.Combine(webHostEnvironment.WebRootPath, USER_CONTENT_FOLDER_NAME);
        }
        public string GetFileUrl(string fileName)
        {
            return $"/{USER_CONTENT_FOLDER_NAME}/{fileName}";
        }
        public async Task SaveFileAsync(Stream mediaBinaryStream, string fileName)
        {
            var filePath = Path.Combine(_userContentFolder, fileName);
            using var output = new FileStream(filePath, FileMode.Create);
            await mediaBinaryStream.CopyToAsync(output);
        }
        public async Task DeleteFileAsync(string fileName)
        {
            var filePath = Path.Combine(_userContentFolder, fileName);
            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
        }

        

       
    }
}
