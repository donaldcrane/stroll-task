export interface IUser {
	_id?: string;
	email: string;
	password: string;
	name?: string;
	role?: string;
	region: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface CustomRequest {
	details: IUser;
	file: object;
	params: object;
	query: object;
	path: object;
}

export interface IQuestion {
	_id?: string;
	question: string;
	region: string;
	cycle: string;
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface IAssignedQuestion {
	_id?: string;
	question: string;
	user: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICycle {
	_id: string;
	name: string;
	duration: number;
	startDate: Date;
	endDate: Date;
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IRegion {
	_id: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface QueueData {
	users: Array<IUser>;
	question?: string;
}

export enum mqQueuesEnum {
	CREATE_QUESTION = "create_question",
}
