export type SnackbarType = "SUCCESS" | "ERROR" | "WARN" | "INFO";

export interface ISnackbarProps {
  /**
   * id
   */
  id: string;
  /**
   * snackbar 본문 메세지
   */
  message: string;
  /**
   * snackbar type ('SUCCESS' | 'ERROR' | 'WARN' | 'INFO')
   */
  type?: SnackbarType;
  /**
   * snack bar title
   */
  title?: string;
  /**
   * 하단에 위치할 action button 이름
   */
  buttonText?: string;
  /**
   * 0: infinity
   * 1 ~ : snackbar가 등장하고 주어진 시간(s)이후에 사라집니다.
   * */
  duration?: number;
  /**
   * 닫기 버튼을 눌렀을 때 발생되는 이벤트
   */
  onClose?: (id: string) => void;
  /**
   * 버튼을 클릭했을 때 action function
   */
  onClickButton?: () => void;
}
