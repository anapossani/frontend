
export interface LoginDto {
  email: string;
  senha_hash: string; 
}

export interface TokenResponse {
  token: string;
}