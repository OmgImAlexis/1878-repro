import {docker} from './docker';

const main = async () => {
	const installed = await docker
		.listContainers({all: true});

	console.info(installed);
};

main().catch(error => {
	console.error(error.message);
});
