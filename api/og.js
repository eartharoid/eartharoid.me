const puppeteer = 'puppeteer-serverless';
const renderSocialImage = 'puppeteer-social-image';

module.exports = async (req, res) => {
	res.send(await renderSocialImage({
		template: 'article',
		templateParams: {
			imageUrl: req.query.image,
			title: req.query.title,
			eyebrow: req.query.date
		},
		browser: await puppeteer.launch({})
	}));
};