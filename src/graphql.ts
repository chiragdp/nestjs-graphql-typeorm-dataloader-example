
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}

export interface SigninUserInput {
    email: string;
    password: string;
}

export interface UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    isActive?: Nullable<boolean>;
    id: number;
}

export interface CreatePostInput {
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    categoryId: number;
}

export interface UpdatePostInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    content?: Nullable<string>;
    thumbnail?: Nullable<string>;
    categoryId?: Nullable<number>;
    id: number;
}

export interface CreateCategoryInput {
    name: string;
    thumbnail: string;
}

export interface UpdateCategoryInput {
    name?: Nullable<string>;
    thumbnail?: Nullable<string>;
    id: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

export interface SigninUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    accessToken: string;
}

export interface Category {
    id: number;
    name: string;
    thumbnail: string;
    category: Category;
    categoryId: number;
    posts: Post[];
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    user: User;
    userId: number;
    category: Category;
    categoryId: number;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(id: number): User | Promise<User>;
    posts(): Post[] | Promise<Post[]>;
    post(id: number): Post | Promise<Post>;
    category(id: number): Category | Promise<Category>;
}

export interface IMutation {
    signup(createUserInput: CreateUserInput): User | Promise<User>;
    signin(SigninUserInput: SigninUserInput): SigninUser | Promise<SigninUser>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): User | Promise<User>;
    createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
    updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;
    removePost(id: number): Post | Promise<Post>;
    createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;
    removeCategory(id: number): Category | Promise<Category>;
}

type Nullable<T> = T | null;
