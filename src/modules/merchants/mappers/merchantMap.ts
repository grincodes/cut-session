import { Mapper } from 'src/core/infra/mapper';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Merchant } from '../domain/merchant';

export class MerchantMapper extends Mapper<Merchant> {
  public static toPersistence(merchant: Merchant) {
    return {
      merchantId: merchant.id.toString(),
      name: merchant.name,
      email: merchant.email,
      cityOfOperation: merchant.cityOfOperation,
      phoneNumber: merchant.phoneNumber,
      metadata: merchant.metadata,
    };
  }
  //   public static toDomain(raw: any): WalletDeposit {
  //     const transactionReference = TransactionReference.createFromString(
  //       raw.transaction_reference,
  //     );
  //     const sourceOrError = TransactionSource.create(raw.source);
  //     const amount = raw.amount;
  //     const balanceBefore = raw.balance_before;
  //     const balanceAfter = raw.balanceAfter;
  //     const platformOrError = Platform.create(raw.platform);
  //     const ownerId = new UniqueEntityID(raw.ownerId);
  //     const combinedPropsResult = Result.combine([sourceOrError]);
  //     if (!combinedPropsResult.isFailure) {
  //       const walletDepositOrError = WalletDeposit.create(
  //         {
  //           transactionReference,
  //           source: sourceOrError.getValue(),
  //           amount,
  //           balanceBefore,
  //           balanceAfter,
  //           platform: platformOrError.getValue(),
  //           ownerId,
  //         },
  //         new UniqueEntityID(raw.wallet_deposit_id),
  //       );

  //       walletDepositOrError.isFailure
  //         ? console.log(walletDepositOrError.error)
  //         : '';
  //       return walletDepositOrError.isSuccess
  //         ? walletDepositOrError.getValue()
  //         : null;
  //     }

  //     return combinedPropsResult.errorValue();
  //   }

  //   public static toResponseDto(walletDeposit: WalletDeposit) {
  //     const response = {
  //       wallet_transaction_reference: walletDeposit.transactionReference.value,
  //       source: walletDeposit.source.value,
  //       amount: walletDeposit.amount,
  //       balance_before: walletDeposit.balanceBefore,
  //       balance_after: walletDeposit.balanceAfter,
  //       platform: walletDeposit.platform.value,
  //       ownerId: walletDeposit.ownerId.toValue(),
  //     };
  //     return response;
  //   }
}
