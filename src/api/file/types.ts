/**
 * 文件API类型声明
 */
export interface FileInfo {
  name: string;
  url: string;
}

export interface returnPictureItem {
  createTime: string;
  delFlag: number;
  id: string;
  informationId: string;
  /**
   * 图片路径
   */
  pictureName: string;
}
