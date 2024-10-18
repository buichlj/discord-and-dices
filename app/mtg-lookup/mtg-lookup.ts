import { RequestService } from "../request-service/request.service";

export class MTGLookup {
    private readonly scryFallFuzzyUrl = 'https://api.scryfall.com/cards/named?fuzzy=';
    private readonly scryFallAutoCompleteUrl = 'https://api.scryfall.com/cards/autocomplete?q=';
    private readonly scryFallPrintsUrl = 'https://api.scryfall.com/cards/search?unique=prints&q='

    public async lookupCard(message: string): Promise<string> {
        const messageName = message.replace('$mtg', '');

        var result = await this.findCard(messageName);
        var returnString = result.success ? await this.getExactCard(result.result) : result.result;
        return returnString;
    }

    private async findCard(messageName: string): Promise<{ success, result }> {
        var returnString = '';
        var success = false;
        try {
            const requestService = new RequestService();
            const card = await requestService.get(this.scryFallFuzzyUrl + messageName) as any;

            if (card && card.status == 404) {
                returnString = 'Could not find card. Try spelling it better or adding more characters, idiot.'
                const catalog = await requestService.get(this.scryFallAutoCompleteUrl + messageName) as any;
                if (catalog?.data?.length > 0) {
                    returnString = 'Did you mean: \n';
                    returnString += catalog.data.slice(0, 10).join('\n');
                }
            } else if (card && card.object == 'error') {
                returnString = `There was problems talking to scryfall: ${card.status}`
            } else if (card && card.object == 'card') {
                success = true;
                returnString = card.name;
            }

        } catch (ex) {
            console.log(ex);
            returnString = 'Error getting card, try and be better.';
        }

        return { success: success, result: returnString };
    }

    private async getExactCard(cardName: string): Promise<string> {
        var returnString = '';
        try {
            const requestService = new RequestService();
            var lowestPricedCard = { prices: { usd: `${Number.MAX_SAFE_INTEGER}` } } as any;
            var prints = (await requestService.get(this.scryFallPrintsUrl + `'${cardName}'`)).data;
            prints.forEach(x => {
                if (x && x.prices && x.name == cardName) {
                    var newCardPrice = x.prices.usd ? x.prices.usd : `${Number.MAX_SAFE_INTEGER}`;
                    var lowCardPrice = lowestPricedCard.prices.usd ? lowestPricedCard.prices.usd : `${Number.MAX_SAFE_INTEGER}`;
                    if (Number(lowCardPrice) >= Number(newCardPrice)) {
                        lowestPricedCard = x;
                    }
                }
            });

            if (lowestPricedCard.card_faces && lowestPricedCard.card_faces[0].image_uris && lowestPricedCard.card_faces[1].image_uris) {
                returnString = lowestPricedCard.card_faces[0].image_uris.large + '\n' + lowestPricedCard.card_faces[1].image_uris.large;
            } else {
                returnString = lowestPricedCard.image_uris.large;
            }

            if (lowestPricedCard.prices && lowestPricedCard.prices.usd) {
                returnString += `\n Price: $${lowestPricedCard.prices.usd}`;
            } else {
                returnString += '\n Price: Unknown';
            }
        } catch (ex) {
            returnString = ex.message;
        }

        return returnString;
    }
}
