import pify from 'pify';
import Docker from 'dockerode';

// Borrowed from https://stackoverflow.com/a/52731696 until pify
// adds their own types, check https://github.com/sindresorhus/pify/issues/74
type UnpackedPromise<T> = T extends Promise<infer U> ? U : T;
type GenericFunction<TS extends any[], R> = (...args: TS) => R;
type Promisify<T> = {
	[K in keyof T]: T[K] extends GenericFunction<infer TS, infer R>
		? (...args: TS) => Promise<UnpackedPromise<R>>
		: never
};

const client = new Docker({
	socketPath: '/var/run/docker.sock'
});
const promisifiedClient = pify(client);

/**
 * Docker client
 */
export const docker = promisifiedClient as unknown as Promisify<typeof client>;
