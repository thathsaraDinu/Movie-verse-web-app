// TMDB Client

// Custom error classes for better error handling
export class TMDBError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "TMDBError";
  }
}

export class TMDBRateLimitError extends TMDBError {
  constructor(message: string = "Rate limit exceeded") {
    super(message, 429);
    this.name = "TMDBRateLimitError";
  }
}

export class TMDBNotFoundError extends TMDBError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
    this.name = "TMDBNotFoundError";
  }
}

export class TMDBConfigError extends TMDBError {
  constructor(message: string = "TMDB API configuration error") {
    super(message);
    this.name = "TMDBConfigError";
  }
}


// Configuration interface
export interface TMDBClientConfig {
  apiKey: string;
  baseUrl?: string;
  imageBaseUrl?: string;
  defaultLanguage?: string;
  defaultRegion?: string;
  includeAdult?: boolean;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}


// Request options interface
export interface TMDBRequestOptions {
  revalidate?: number | false;
  tags?: string[];
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}


// Default configuration
const DEFAULT_CONFIG: Required<Omit<TMDBClientConfig, "apiKey">> = {
  baseUrl: "https://api.themoviedb.org/3",
  imageBaseUrl: "https://image.tmdb.org/t/p",
  defaultLanguage: "en-US",
  defaultRegion: "US",
  includeAdult: false,
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};


// Request deduplication cache
// Prevents duplicate simultaneous TMDB calls
const requestCache = new Map<string, Promise<any>>();


// TMDB Client
export class TMDBClient {
  private config: Required<TMDBClientConfig>;
  private apiKey: string;


  constructor(config: TMDBClientConfig) {
    if (!config.apiKey) {
      throw new TMDBConfigError("API key is required");
    }

    this.apiKey = config.apiKey;
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }


  private buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string {

  const url = new URL(`${this.config.baseUrl}${endpoint}`);

  url.searchParams.append(
    "api_key",
    this.apiKey
  );

  url.searchParams.append(
    "language",
    this.config.defaultLanguage
  );


  if (params) {

    Object.entries(params).forEach(([key, value]) => {

      if (
        value !== undefined &&
        value !== null &&
        key !== "language"
      ) {
        url.searchParams.append(
          key,
          String(value)
        );
      }

    });

  }

  return url.toString();
}


  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }




  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit & TMDBRequestOptions = {}
  ): Promise<T> {

    const {
      retryAttempts,
      retryDelay,
      timeout,
    } = this.config;


    let lastError: Error | null = null;



    for (
      let attempt = 0;
      attempt <= retryAttempts;
      attempt++
    ) {

      try {

        const controller =
          new AbortController();


        const timeoutId =
          setTimeout(
            () => controller.abort(),
            timeout
          );



        const response = await fetch(
          url,
          {
            ...options,
            signal: controller.signal,
          }
        );



        clearTimeout(timeoutId);



        if (!response.ok) {


          if (response.status === 404) {
            throw new TMDBNotFoundError();
          }



          if (response.status === 429) {

            const retryAfter =
              response.headers.get(
                "Retry-After"
              );


            const waitTime =
              retryAfter
                ? parseInt(retryAfter) * 1000
                : retryDelay * (attempt + 1);



            if (attempt < retryAttempts) {

              await this.sleep(waitTime);
              continue;

            }


            throw new TMDBRateLimitError();
          }



          throw new TMDBError(
            `TMDB API error: ${response.status} ${response.statusText}`,
            response.status,
            url
          );
        }



        return response.json();


      } catch (error) {


        lastError = error as Error;



        if (
          error instanceof TMDBRateLimitError ||
          error instanceof TMDBNotFoundError
        ) {
          throw error;
        }



        if (attempt < retryAttempts) {

          await this.sleep(
            retryDelay * Math.pow(2, attempt)
          );

        }

      }

    }



    throw (
      lastError ||
      new TMDBError(
        "Failed to fetch data from TMDB"
      )
    );
  }






  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    options?: TMDBRequestOptions
  ): Promise<T> {


    const url =
      this.buildUrl(
        endpoint,
        params
      );



    const cacheKey =
      `${url}-${JSON.stringify(options)}`;



    // Prevent duplicate simultaneous requests
    if (requestCache.has(cacheKey)) {

      return requestCache.get(cacheKey)!;

    }



    const promise =
      this.fetchWithRetry<T>(
        url,
        {

          ...options,


          next: {

            // Default cache: 24 hours
            revalidate:
              options?.revalidate ?? 86400,


            tags:
              options?.tags ?? [],


            ...options?.next,

          },

        }
      );



    requestCache.set(
      cacheKey,
      promise
    );



    try {

      return await promise;

    } finally {

      requestCache.delete(cacheKey);

    }

  }





  getImageUrl(
    path: string | null,
    size: string = "w500"
  ): string {

    if (!path) {
      return "/placeholder-movie.jpg";
    }


    return `${this.config.imageBaseUrl}/${size}${path}`;

  }





  getDateRange(
    daysFromNow: number,
    daysToAdd: number = 0
  ): {
    start: string;
    end: string;
  } {

    const today = new Date();


    const start =
      new Date(today);


    start.setDate(
      today.getDate() + daysFromNow
    );



    const end =
      new Date(today);


    end.setDate(
      today.getDate() + daysFromNow + daysToAdd
    );



    return {

      start:
        start.toISOString()
          .split("T")[0],


      end:
        end.toISOString()
          .split("T")[0],

    };

  }





  getDateYearsAgo(
    years: number
  ): string {

    const date =
      new Date();


    date.setFullYear(
      date.getFullYear() - years
    );


    return date.toISOString()
      .split("T")[0];

  }

}



// Singleton instance

let clientInstance: TMDBClient | null = null;



export function getTMDBClient(): TMDBClient {

  if (!clientInstance) {

    const apiKey =
      process.env.TMDB_API_KEY;



    if (!apiKey) {

      throw new TMDBConfigError(
        "TMDB_API_KEY environment variable is not set"
      );

    }



    clientInstance =
      new TMDBClient({
        apiKey,
      });

  }



  return clientInstance;

}