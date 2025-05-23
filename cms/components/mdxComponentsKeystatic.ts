import { CalloutKeystatic } from '@components/text/Callout.keystatic'
import { keystaticButtonConfig } from './Button/keystatic.button.config'
import { keystaticDownloadButtonConfig } from './DownloadButton/keystatic.downloadButton.config'
import { keystaticImageDoubleConfig } from './ImageDouble/keystatic.ImageDouble.config'
import { keystaticImageSingleHorizontalConfig } from './ImageSingleHorizontal/keystatic.ImageSingleHorizontal.config'
import { keystaticImageSingleSquareConfig } from './ImageSingleSquare/keystatic.ImageSingleSquare.config'
import { keystaticYouTubePreviewConfig } from './YoutubePreview/keystatic.youtubePreview.config'

export const mdxComponentsKeystatic = (imagePath: string) => {
  return {
    Button: keystaticButtonConfig,
    DownloadButton: keystaticDownloadButtonConfig(imagePath),
    YouTubePreview: keystaticYouTubePreviewConfig(imagePath),
    ImageSingleHorizontal: keystaticImageSingleHorizontalConfig(imagePath),
    ImageSingleSquare: keystaticImageSingleSquareConfig(imagePath),
    ImageDouble: keystaticImageDoubleConfig(imagePath),
    Callout: CalloutKeystatic,
  }
}
