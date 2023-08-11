class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };

        this.formasDePagamento = ["dinheiro", "debito", "credito"];
        this.descontos = { dinheiro: 0.05, credito: 0.03 };
        this.acrescimos = { credito: 0.03 };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        metodoDePagamento = metodoDePagamento.toLowerCase();
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        const itemQuantities = {};

        for (const itemInfo of itens) {
            const [itemCode, quantity] = itemInfo.split(",");
            const item = this.cardapio[itemCode];

            if (!item) {
                return "Item inválido!";
            }

            if (!itemQuantities[itemCode]) {
                itemQuantities[itemCode] = 0;
            }
            itemQuantities[itemCode] += parseInt(quantity);

            if (itemCode !== "chantily" && itemCode !== "queijo") {
                valorTotal += item.valor * parseInt(quantity);
            }
        }

        for (const itemCode in itemQuantities) {
            if (itemCode === "chantily" || itemCode === "queijo") {
                const principalItemCode = itemCode === "chantily" ? "cafe" : "sanduiche";
                if (!itemQuantities[principalItemCode]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        if (itemQuantities["cafe"]) {
            valorTotal -= itemQuantities["chantily"] * this.cardapio["chantily"].valor;
        }

        if (itemQuantities["sanduiche"]) {
            valorTotal -= itemQuantities["queijo"] * this.cardapio["queijo"].valor;
        }

        if (itemQuantities["combo1"]) {
            valorTotal -= itemQuantities["suco"] * this.cardapio["suco"].valor;
        }

        if (itemQuantities["combo2"]) {
            valorTotal -= itemQuantities["cafe"] * this.cardapio["cafe"].valor;
        }

        if (this.descontos[metodoDePagamento]) {
            valorTotal *= (1 - this.descontos[metodoDePagamento]);
        }

        if (this.acrescimos[metodoDePagamento]) {
            valorTotal *= (1 + this.acrescimos[metodoDePagamento]);
        }

        return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}
export { CaixaDaLanchonete };


