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
    try{
        // get the response from openai
        // https://beta.openai.com/docs/api-reference/images/create
        const response = await openai.createImage({
            prompt: 'Cat with red hat',
            n: 1,
            size: '512x512'
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