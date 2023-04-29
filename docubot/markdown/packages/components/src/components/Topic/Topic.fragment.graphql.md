# README

## TODO Items
- No TODO items at the moment.

## Known Issues
- No known issues at the moment.

## Code Documentation

### Fragment: Topic_BaseFragment
This fragment is used to retrieve data related to a topic. It includes the following fields:
- `...Content_BaseFragment`: This is a spread operator used to retrieve data from another fragment called `Content_BaseFragment`.
- `title`: The title of the topic.
- `seo`: The SEO information related to the topic.
- `slug`: The URL slug for the topic.
- `header`: A content module fragment representing the header of the topic.
- `footer`: A content module fragment representing the footer of the topic.
- `hero`: A content module fragment representing the hero section of the topic.
- `contents`: A content module fragment representing the contents of the topic.

### Fragment: ContentModule_BaseFragment
This fragment is used to retrieve data related to a content module. It includes the following fields:
- `... on ContentModuleText`: This is a spread operator used to retrieve data from another fragment called `ContentModuleText`.
- `... on ContentModuleImage`: This is a spread operator used to retrieve data from another fragment called `ContentModuleImage`.
- `... on ContentModuleVideo`: This is a spread operator used to retrieve data from another fragment called `ContentModuleVideo`.
- `... on ContentModuleAudio`: This is a spread operator used to retrieve data from another fragment called `ContentModuleAudio`.
- `... on ContentModuleQuiz`: This is a spread operator used to retrieve data from another fragment called `ContentModuleQuiz`.
- `... on ContentModuleDownload`: This is a spread operator used to retrieve data from another fragment called `ContentModuleDownload`.

### Fragment: ContentModuleText
This fragment is used to retrieve data related to a text content module. It includes the following fields:
- `text`: The text content of the module.

### Fragment: ContentModuleImage
This fragment is used to retrieve data related to an image content module. It includes the following fields:
- `url`: The URL of the image.
- `alt`: The alt text of the image.

### Fragment: ContentModuleVideo
This fragment is used to retrieve data related to a video content module. It includes the following fields:
- `url`: The URL of the video.
- `thumbnail`: The URL of the video thumbnail.
- `title`: The title of the video.

### Fragment: ContentModuleAudio
This fragment is used to retrieve data related to an audio content module. It includes the following fields:
- `url`: The URL of the audio file.
- `title`: The title of the audio file.

### Fragment: ContentModuleQuiz
This fragment is used to retrieve data related to a quiz content module. It includes the following fields:
- `title`: The title of the quiz.
- `questions`: A list of questions in the quiz.

### Fragment: ContentModuleDownload
This fragment is used to retrieve data related to a download content module. It includes the following fields:
- `url`: The URL of the file to be downloaded.
- `title`: The title of the file to be downloaded.