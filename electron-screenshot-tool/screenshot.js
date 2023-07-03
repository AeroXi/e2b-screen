const { desktopCapturer, screen } = require('electron');

function takeScreenshot() {
  return new Promise((resolve, reject) => {
    desktopCapturer.getSources({ types: ['screen'] }, (error, sources) => {
      if (error) return reject(error);

      const screenArea = screen.getPrimaryDisplay().bounds;
      const wholeScreenSource = sources.find(
        source => source.name === 'Entire screen' || source.name === 'Screen 1'
      );

      if (!wholeScreenSource) return reject(new Error('No screen source found.'));

      resolve({
        screenshotData: wholeScreenSource.thumbnail.toDataURL(),
        selectedArea: screenArea
      });
    });
  });
}

module.exports = {
  takeScreenshot
};