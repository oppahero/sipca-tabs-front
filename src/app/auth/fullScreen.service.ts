import { Injectable } from '@angular/core'

interface FsDocument extends HTMLDocument {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
}

interface FsDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class FullScreenService {

  isFullScreen(): boolean {
    const fsDoc = <FsDocument>document

    return !!(
      fsDoc.fullscreenElement ||
      fsDoc.mozFullScreenElement ||
      fsDoc.fullscreenElement ||
      fsDoc.msFullscreenElement
    )
  }

  toggleFullScreen(): void {
    const fsDoc = <FsDocument>document

    if (!this.isFullScreen()) {
      const fsDocElem = <FsDocumentElement>document.documentElement

      if (fsDocElem.requestFullscreen) fsDocElem.requestFullscreen()
      else if (fsDocElem.msRequestFullscreen) fsDocElem.msRequestFullscreen()
      else if (fsDocElem.mozRequestFullScreen) fsDocElem.mozRequestFullScreen()
      else if (fsDocElem.requestFullscreen) fsDocElem.requestFullscreen()
    } else if (fsDoc.exitFullscreen) fsDoc.exitFullscreen()
    else if (fsDoc.msExitFullscreen) fsDoc.msExitFullscreen()
    else if (fsDoc.mozCancelFullScreen) fsDoc.mozCancelFullScreen()
    else if (fsDoc.exitFullscreen) fsDoc.exitFullscreen()
  }

  setFullScreen(full: boolean): void {
    if (full !== this.isFullScreen()) this.toggleFullScreen()
  }
}
