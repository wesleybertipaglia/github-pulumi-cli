import { User } from "./user";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
  is_template: boolean;
  html_url: string;
  default_branch: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  open_issues_count: number;
  forks_count: number;
  topics: string[];
  owner: User;
  [key: string]: any;
}

export interface CreateDto {
  name: string;
  description?: string;
}

export interface UpdateDto {
  name?: string;
  description?: string;
}
