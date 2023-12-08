const axios = require('axios');

class YoutubeConverter {
  async analyzeAndConvert(videoUrl) {
    return new Promise(async (resolve, reject) => {
      try {
        const searchData = `query=${encodeURIComponent(videoUrl)}&vt=home`;
        const searchResponse = await axios.post("https://9convert.com/api/ajaxSearch/index", searchData, { headers: this.searchHeaders });

        const json = searchResponse.data
        const video = {};
        Object.values(json.links.mp4).forEach(({ q, size, k }) => {
          video[q] = {
            quality: q,
            fileSizeH: size,
            fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
            download: () => this.convert(json.vid, k)
          };
        });
        const audio = {};
        Object.values(json.links.mp3).forEach(({ q, size, k }) => {
          audio[q] = {
            quality: q,
            fileSizeH: size,
            fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
            download: () => this.convert(json.vid, k)
          };
        });
        const res = {
          id: json.vid,
          title: json.title,
          thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
          video,
          audio
        };
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  async convert(vid, k) {
    return new Promise(async (resolve, reject) => {
      const params = `vid=${vid}&k=${k}`;
      const { data } = await axios.post("https://9convert.com/api/ajaxConvert/convert", params, {
        headers: {
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        },
      })
      if (data.c_status == "CONVERTING") {
        const param = `vid=${vid}&b_id=${data.b_id}`
        const json = (await axios.post("https://9convert.com/api/ajaxConvert/checkTask", params, {
          headers: {
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
          },
        }))
        resolve(json.data.dlink)
      } else {
        resolve(data.dlink)
      }
    })
  }
}

exports.youtube = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
    const converter = new YoutubeConverter();
    const data = await converter.analyzeAndConvert('https://youtu.be/jsAn9AKWK40?si=6BtmluLIcbhwLTEs')
    resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

