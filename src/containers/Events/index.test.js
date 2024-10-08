/** @format */

import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
	events: [
		{
			id: 1,
			type: "soirée entreprise",
			date: "2022-04-29T20:28:45.744Z",
			title: "Conférence #productCON",
			cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
			description:
				"Présentation des outils analytics aux professionnels du secteur",
			nb_guesses: 1300,
			periode: "24-25-26 Février",
			prestations: [
				"1 espace d’exposition",
				"1 scéne principale",
				"2 espaces de restaurations",
				"1 site web dédié",
			],
		},

		{
			id: 2,
			type: "forum",
			date: "2022-04-29T20:28:45.744Z",
			title: "Forum #productCON",
			cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
			description:
				"Présentation des outils analytics aux professionnels du secteur",
			nb_guesses: 1300,
			periode: "24-25-26 Février",
			prestations: ["1 espace d’exposition", "1 scéne principale"],
		},
	],
};

describe("When Events is created", () => {
	it("a list of event card is displayed", async () => {
		api.loadData = jest.fn().mockReturnValue(data);
		render(
			<DataProvider>
				<Events />
			</DataProvider>
		);
		await screen.findAllByText("avril");
	}); // Remplace findByText by findAllByText
	describe("and an error occured", () => {
		it("an error message is displayed", async () => {
			api.loadData = jest
				.fn()
				.mockRejectedValue(new Error("Erreur de chargement"));
			render(
				<DataProvider>
					<Events />
				</DataProvider>
			);
			expect(await screen.findByText("An error occured")).toBeInTheDocument();
		});
	}); // Add new Error in the mockRejectedValue

	describe("and we select a category", () => {
		it("an filtered list is displayed", async () => {
			api.loadData = jest.fn().mockReturnValue(data);
			render(
				<DataProvider>
					<Events />
				</DataProvider>
			); // Deleted it.only
			await screen.findByText("Forum #productCON");
			fireEvent(
				await screen.findByTestId("collapse-button-testid"),
				new MouseEvent("click", {
					cancelable: true,
					bubbles: true,
				})
			);
			fireEvent(
				(await screen.findAllByText("soirée entreprise"))[0],
				new MouseEvent("click", {
					cancelable: true,
					bubbles: true,
				})
			);

			await screen.findByText("Conférence #productCON");
			expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
		});
	});

	describe("and we click on an event", () => {
		it("the event detail is displayed", async () => {
			api.loadData = jest.fn().mockReturnValue(data);
			render(
				<DataProvider>
					<Events />
				</DataProvider>
			);

			fireEvent(
				await screen.findByText("Conférence #productCON"),
				new MouseEvent("click", {
					cancelable: true,
					bubbles: true,
				})
			);

			await screen.findByText("24-25-26 Février");
			await screen.findByText("1 site web dédié");
		});
	});
});

// // // // // // // // // // // // // // //

// import { fireEvent, render, screen, act } from "@testing-library/react";
// import { DataProvider } from "../../contexts/DataContext";
// import Events from "./index";

// const data = {
// 	events: [
// 		{
// 			id: 1,
// 			type: "soirée entreprise",
// 			date: "2022-04-29T20:28:45.744Z",
// 			title: "Conférence #productCON",
// 			cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
// 			description:
// 				"Présentation des outils analytics aux professionnels du secteur",
// 			nb_guesses: 1300,
// 			periode: "24-25-26 Février",
// 			prestations: [
// 				"1 espace d’exposition",
// 				"1 scéne principale",
// 				"2 espaces de restaurations",
// 				"1 site web dédié",
// 			],
// 		},
// 		{
// 			id: 2,
// 			type: "forum",
// 			date: "2022-04-29T20:28:45.744Z",
// 			title: "Forum #productCON",
// 			cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
// 			description:
// 				"Présentation des outils analytics aux professionnels du secteur",
// 			nb_guesses: 1300,
// 			periode: "24-25-26 Février",
// 			prestations: ["1 espace d’exposition", "1 scéne principale"],
// 		},
// 	],
// };

// describe("When Events is created", () => {
// 	it("a list of event card is displayed", async () => {
// 		await act(async () => {
// 			render(
// 				<DataProvider>
// 					<Events />
// 				</DataProvider>
// 			);
// 		});
// 		await screen.findByText("avril");
// 	});

// 	describe("and an error occurred", () => {
// 		it("an error message is displayed", async () => {
// 			api.loadData = jest.fn().mockRejectedValue();
// 			await act(async () => {
// 				render(
// 					<DataProvider>
// 						<Events />
// 					</DataProvider>
// 				);
// 			});
// 			expect(await screen.findByText("An error occurred")).toBeInTheDocument();
// 		});
// 	});

// 	describe("and we select a category", () => {
// 		it("a filtered list is displayed", async () => {
// 			api.loadData = jest.fn().mockReturnValue(data);
// 			await act(async () => {
// 				render(
// 					<DataProvider>
// 						<Events />
// 					</DataProvider>
// 				);
// 			});
// 			await screen.findByText("Forum #productCON");
// 			fireEvent(
// 				await screen.findByTestId("collapse-button-testid"),
// 				new MouseEvent("click", {
// 					cancelable: true,
// 					bubbles: true,
// 				})
// 			);
// 			fireEvent(
// 				(await screen.findAllByText("soirée entreprise"))[0],
// 				new MouseEvent("click", {
// 					cancelable: true,
// 					bubbles: true,
// 				})
// 			);
// 			await screen.findByText("Conférence #productCON");
// 			expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
// 		});
// 	});

// 	describe("and we click on an event", () => {
// 		it("the event detail is displayed", async () => {
// 			api.loadData = jest.fn().mockReturnValue(data);
// 			await act(async () => {
// 				render(
// 					<DataProvider>
// 						<Events />
// 					</DataProvider>
// 				);
// 			});
// 			fireEvent(
// 				await screen.findByText("Conférence #productCON"),
// 				new MouseEvent("click", {
// 					cancelable: true,
// 					bubbles: true,
// 				})
// 			);
// 			await screen.findByText("24-25-26 Février");
// 			await screen.findByText("1 site web dédié");
// 		});
// 	});
// });

// // // // // // // // // // // // //

// import { fireEvent, render, screen, act } from "@testing-library/react";
// import { DataProvider } from "../../contexts/DataContext";
// import Events from "./index";
// import { api } from "../../contexts/DataContext"; // Ensure api is imported

// const data = {
// 	events: [
// 		{
// 			id: 1,
// 			type: "soirée entreprise",
// 			date: "2022-04-29T20:28:45.744Z",
// 			title: "Conférence #productCON",
// 			cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
// 			description:
// 				"Présentation des outils analytics aux professionnels du secteur",
// 			nb_guesses: 1300,
// 			periode: "24-25-26 Février",
// 			prestations: [
// 				"1 espace d’exposition",
// 				"1 scéne principale",
// 				"2 espaces de restaurations",
// 				"1 site web dédié",
// 			],
// 		},
// 		{
// 			id: 2,
// 			type: "forum",
// 			date: "2022-04-29T20:28:45.744Z",
// 			title: "Forum #productCON",
// 			cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
// 			description:
// 				"Présentation des outils analytics aux professionnels du secteur",
// 			nb_guesses: 1300,
// 			periode: "24-25-26 Février",
// 			prestations: ["1 espace d’exposition", "1 scéne principale"],
// 		},
// 	],
// };

// describe("When Events is created", () => {
// 	beforeEach(() => {
// 		api.loadData = jest.fn().mockReturnValue(data); // Mock api.loadData
// 	});

// 	it("a list of event card is displayed", async () => {
// 		await act(async () => {
// 			render(
// 				<DataProvider>
// 					<Events />
// 				</DataProvider>
// 			);
// 		});
// 		await screen.findByText("avril");
// 	});

// 	describe("and an error occurred", () => {
// 		it("an error message is displayed", async () => {
// 			api.loadData = jest
// 				.fn()
// 				.mockRejectedValue(new Error("Erreur de chargement"));
// 			await act(async () => {
// 				render(
// 					<DataProvider>
// 						<Events />
// 					</DataProvider>
// 				);
// 			});
// 			expect(await screen.findByText("An error occurred")).toBeInTheDocument();
// 		});
// 	});

// 	describe("and we select a category", () => {
// 		it("a filtered list is displayed", async () => {
// 			api.loadData = jest.fn().mockReturnValue(data);
// 			await act(async () => {
// 				render(
// 					<DataProvider>
// 						<Events />
// 					</DataProvider>
// 				);
// 			});
// 			await screen.findByText("Forum #productCON");
// 			fireEvent(
// 				await screen.findByTestId("collapse-button-testid"),
// 				new MouseEvent("click", {
// 					cancelable: true,
// 					bubbles: true,
// 				})
// 			);
// 			fireEvent(
// 				(await screen.findAllByText("soirée entreprise"))[0],
// 				new MouseEvent("click", {
// 					cancelable: true,
// 					bubbles: true,
// 				})
// 			);

// 			await screen.findByText("Conférence #productCON");
// 			expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
// 		});
// 	});

// 	describe("and we click on an event", () => {
// 		it("the event detail is displayed", async () => {
// 			api.loadData = jest.fn().mockReturnValue(data);
// 			await act(async () => {
// 				render(
// 					<DataProvider>
// 						<Events />
// 					</DataProvider>
// 				);
// 			});
// 			fireEvent(
// 				await screen.findByText("Conférence #productCON"),
// 				new MouseEvent("click", {
// 					cancelable: true,
// 					bubbles: true,
// 				})
// 			);

// 			await screen.findByText("24-25-26 Février");
// 			await screen.findByText("1 site web dédié");
// 		});
// 	});
// });
