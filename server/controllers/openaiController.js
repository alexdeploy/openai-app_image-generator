const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Generate simple image from text
 * @param {*} req 
 * @param {*} res 
 */

const generateImage = async (req, res) => {

    const { prompt, size } = req.body; // props sended from the client

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try{
        // get the response from openai
        // https://beta.openai.com/docs/api-reference/images/create
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: imageSize
        })

        // generate image url
        const imageUrl = response.data.data[0].url;

        // the response
        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}

module.exports = { generateImage };