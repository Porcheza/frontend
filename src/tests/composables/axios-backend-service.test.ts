import { useAxiosBackendService } from "../../composables/axios-backend-service";
import { describe, expect, it } from "vitest";

describe("Axios Backend Service", () => {
  it("Should be defined", () => {
    const { axiosInstance } = useAxiosBackendService();
    expect(axiosInstance).toBeDefined();
  });

  it("Should be valid config", () => {
    const { axiosInstance } = useAxiosBackendService();
    expect(axiosInstance.defaults.baseURL).toEqual(
      import.meta.env.VITE_BASE_API_URL
    );
  });
});
