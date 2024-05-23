import { Elysia, t } from "elysia";

export const app = new Elysia().get(
    "/health",
    async ({ error }) => {
      try {
        const startTime = performance.now();
        await Bun.password.hash(
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkdmJfMmVpS1BDUVRIRk53d3ZOQzZpOVVja21OcnoyIiwiaWQiOiJjbGllbnRfMmVpY2w4YUlkZ2dFaXVGT3FFeklEdUVTc2tpIiwicm90YXRpbmdfdG9rZW4iOiI1OXd6bHZ2bHRibDRoa3R2N3VjeWJoNHljYmFhbmpncnZyajRhcGkxIn0.UF7dll7lyoi7gxFji0UbafB1FLzsRcSg0643iybN8S7OlnDYVQ_KUDMszssMpTc8-CV6qncJBPGGBklzGmxm5Pcb4YGomhFCO1XBL8Eq3ihHA2MFeO0L2MmPPrVFFBnGSiuduLxOJGANa3vgS8L0MfjqQZ471jPLEuT7HqgIRc389sRCjbZEzlKImmQTpszec9Z9IiJmseUEwqCI4BGuxGhJKZhlnzWoRV3tfHRQi0okb7JjXrXDooFrx8Fjhv19lGdwwwkiI7-CWOu5ILaHUnS5tJKgcFxFSLbbUWloQMhY1K68TeXca4_dQAjbqz7ajgNqebEELeKVmSUmYi-mLg",
          {
            algorithm: "argon2d", // "argon2id" | "argon2i" | "argon2d"
            memoryCost: 2, // memory usage in kibibytes
            timeCost: 1500, // the number of iterations
          }
        );
        const cryptoFunc = Math.floor(performance.now() - startTime);

        return {
          message: "success",
          data: {
            cryptoFunc,
          },
        };
      } catch (err) {
        console.log(err);
        return error(500, "Internal Server Error");
      }
    },
    {
      detail: {
        description: "Check server health",
        tags: ["Public"],
      },
    }
  )
