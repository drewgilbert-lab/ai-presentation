import { google } from 'googleapis';

const DRIVE_READONLY_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const DRIVE_WRITE_SCOPE = 'https://www.googleapis.com/auth/drive';

export function getDriveClient({ write = false } = {}) {
  const folderId = process.env.GDRIVE_FOLDER_ID;
  const serviceAccountJson = process.env.GDRIVE_SERVICE_ACCOUNT_JSON;

  if (!folderId) {
    console.error('Error: GDRIVE_FOLDER_ID environment variable is required');
    process.exit(1);
  }

  if (!serviceAccountJson) {
    console.error('Error: GDRIVE_SERVICE_ACCOUNT_JSON environment variable is required');
    process.exit(1);
  }

  let credentials;
  try {
    credentials = JSON.parse(serviceAccountJson);
  } catch {
    console.error('Error: GDRIVE_SERVICE_ACCOUNT_JSON must be valid JSON');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [write ? DRIVE_WRITE_SCOPE : DRIVE_READONLY_SCOPE],
  });

  return {
    drive: google.drive({ version: 'v3', auth }),
    folderId,
  };
}

export async function listMarkdownFiles(drive, folderId) {
  const files = [];
  let pageToken;

  do {
    const { data } = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false and name contains '.md'`,
      fields: 'nextPageToken, files(id, name, modifiedTime)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      pageToken,
    });

    for (const file of data.files ?? []) {
      if (file.name.endsWith('.md')) {
        files.push(file);
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

export async function findMarkdownFileByName(drive, folderId, filename) {
  const { data } = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false and name='${filename.replace(/'/g, "\\'")}'`,
    fields: 'files(id, name)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  return data.files?.[0] ?? null;
}

export async function downloadFile(drive, fileId) {
  const { data } = await drive.files.get(
    {
      fileId,
      alt: 'media',
      supportsAllDrives: true,
    },
    { responseType: 'text' },
  );

  return data;
}

export async function uploadMarkdownFile(drive, folderId, filename, content) {
  const media = {
    mimeType: 'text/markdown',
    body: content,
  };

  const existing = await findMarkdownFileByName(drive, folderId, filename);

  if (existing) {
    const { data } = await drive.files.update({
      fileId: existing.id,
      media,
      supportsAllDrives: true,
    });
    return { action: 'updated', file: data };
  }

  const { data } = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
      mimeType: 'text/markdown',
    },
    media,
    supportsAllDrives: true,
  });

  return { action: 'created', file: data };
}
