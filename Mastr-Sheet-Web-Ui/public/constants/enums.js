export class StudyType {
    static  #_Evening = 'مسائي';
    static  #_Morning = 'صباحي';
  
    static get Evening(){
      return this.#_Evening;
    }
  
    static get Morning() {
      return this.#_Morning;
    }
  }
  
  export class GenderType {
    static  #_Male = 'ذكر';
    static  #_Female = 'أنثى';
  
    static get Male() {
      return this.#_Male;
    }
  
    static get Female() {
      return this.#_Female;
    }
  }
  
  export class SemesterType {
    static  #_First = 'الأول';
    static #_Second = 'الثاني';
  
    static get First() {
      return this.#_First;
    }
  
    static get Second() {
      return this.#_Second;
    }
  }
  
  export class UserRole {
    static  #_Dean = 'عميد الكلية';
    static  #_DepartmentHead = 'رئيس القسم';
    static  #_Supervisor = 'عضو';
  
    static get Dean() {
      return this.#_Dean;
    }
  
    static get DepartmentHead() {
      return this.#_DepartmentHead;
    }
  
    static get Supervisor() {
      return this.#_Supervisor;
    }
  }

  export class Status {
    static  #_Uploading = 'تحميل';
    static  #_Resumed = 'أستأنف';
    static  #_Ongoing = 'أستمرار';
    static  #_Stoping = 'ترقين القيد';
    static  #_Graduation = 'تخرج';

    static get Uploading() {
      return this.#_Uploading;
    }
  
    static get Resumed() {
      return this.#_Resumed;
    }
  
    static get Ongoing() {
      return this.#_Ongoing;
    }

    static get Stoping() {
      return this.#_Stoping;
    }
    static get Graduation() {
      return this.#_Graduation;
    }
  }
  