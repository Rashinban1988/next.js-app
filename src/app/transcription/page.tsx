'use client';
import React, { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { Footer } from '../components/transcription/Footer';
import { Header } from '../components/transcription/Header';

interface UploadedFile {
  id: number;
  file: string;
  created_at: string; // 日付のフォーマットはバックエンドに依存します
}

const UploadedFilesPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // アップロード進行状況の状態を追加

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        let instance: AxiosInstance = axios.create({
            // baseURL: 'http://localhost:8080',
            // baseURL: 'http://127.0.0.1:8000',
            baseURL: 'https://django-app.rakumanu.com',
        });
        const response = await instance.get('/spokenMaterial/uploaded-files/');
        console.log('アップロードされたファイルを取得しました', response.data);
        const uploadedFiles = response.data;
        // ファイルパスを表示用に変換
        // 例: "C:\Users\user\Documents\sample.txt" => "sample.txt"

        console.log('変換後のデータ', uploadedFiles);
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('アップロードされたファイルの取得に失敗しました', error);
      }
    };

    fetchUploadedFiles();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        // await axios.post('http://localhost:8080/api/spokenMaterial/uploaded-files/', formData, {
        // await axios.post('http://127.0.0.1:8000/spokenMaterial/uploaded-files/', formData, {
        await axios.post('https://django-app.rakumanu.com/spokenMaterial/uploaded-files/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
            setUploadProgress(percentCompleted); // アップロード進行状況を更新
          },
        });
        alert('ファイルが正常にアップロードされました。');

        // アップロード後にファイルリストを更新
        let instance: AxiosInstance = axios.create({
        //   baseURL: 'http://localhost:8080',
        //   baseURL: 'http://127.0.0.1:8000',
          baseURL: 'https://django-app.rakumanu.com',
        });
        const response = await instance.get('/spokenMaterial/uploaded-files/');
        setUploadedFiles(response.data);
        setUploadProgress(0); // アップロード完了後、進行状況をリセット
      } catch (error) {
        console.error('ファイルのアップロードに失敗しました', error);
        alert('ファイルのアップロードに失敗しました。');
        setUploadProgress(0); // エラー発生時に進行状況をリセット
      }
    }
  };

  return (
    <>
      <Header />
      <div className="my-8">
        <h2 className="text-center text-2xl font-bold my-4">文字起こし済みデータ一覧</h2>
        <div className="text-center">
          <label htmlFor="upload-button" className="cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700">
            ファイルをアップロード
          </label>
          <input id="upload-button" type="file" className="hidden" onChange={handleFileUpload} />
          {uploadProgress > 0 && (
            <div className="text-center my-2">
              アップロード中: {uploadProgress}%
            </div>
          )}
        </div>
        <div className="max-w-lg mx-auto my-8 grid grid-cols-1 gap-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow group hover:shadow-md hover:bg-yellow-200 overflow-hidden cursor-pointer group" onClick={() => window.location.href=`/transcription/${file.id}?file=${encodeURIComponent(file.file.split('/').pop() ?? '')}`}>
              <div className="p-4 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 group-hover:bg-red-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18l15-9-15-9z" /></svg>
                </div>
                <span className="text-sm font-semibold">{file.file.split('/').pop()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadedFilesPage;